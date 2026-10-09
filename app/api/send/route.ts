import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { confirmationEmail, CONTACT } from '@/lib/email/confirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

// Sending to visitors needs a domain verified in Resend (e.g. travis.work).
// Resend's shared onboarding@resend.dev sender can only deliver to the account owner.
const FROM = process.env.RESEND_FROM || 'Travis Weerts <onboarding@resend.dev>';

export async function POST(request: Request) {
  try {
    const { name, email, message, source } = await request.json();

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: CONTACT.email,
      subject: `TRAVIS.WORK - New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSource: ${source || 'unknown'}\nMessage: ${message}`,
      replyTo: email,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Branded confirmation to the sender. If it fails, the enquiry still went
    // through, so don't fail the request; just log it.
    const confirmation = confirmationEmail({ name, message });
    const { error: confirmError } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: CONTACT.email,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (confirmError) console.error('Confirmation email failed:', confirmError);

    return NextResponse.json({ success: true, data });
  } catch (error: Error | any) {
    return NextResponse.json({ error: 'Internal server error: ' + error.text }, { status: 500 });
  }
}
