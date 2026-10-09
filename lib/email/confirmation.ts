// Branded "thanks, I'll be in touch" email sent to people who use the contact
// form. Table layout + inline styles so it renders in Gmail, Outlook and Apple Mail.

export const CONTACT = {
  email: "travisaweerts@gmail.com",
  phone: "0422 188 213",
  phoneHref: "tel:+61422188213",
  site: "https://travis.work",
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function confirmationEmail({ name, message }: { name: string; message: string }) {
  const first = name.trim().split(/\s+/)[0] || "there";
  const subject = `Thanks ${first}, I've got your message`;

  const text = `Hey ${first},

Thanks for reaching out. Your message is in my inbox and I'll get back to you personally, usually within one business day.

If anything comes up in the meantime, you can reach me directly:
Mobile: ${CONTACT.phone}
Email: ${CONTACT.email}

Here's what you sent:
${message}

Talk soon,
Travis Weerts
Designer, developer & creative consultant, Perth WA
${CONTACT.site}`;

  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#e0d3bd;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Your message is in. I'll reply personally, usually within one business day.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#e0d3bd;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111111;border-radius:28px;overflow:hidden;">
        <tr><td style="padding:36px 40px 0 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
            <td style="font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:800;letter-spacing:-0.5px;color:#e0d3bd;line-height:1;">TRAVIS<br>WEERTS</td>
            <td align="right" style="font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:2px;color:#736b5e;text-transform:uppercase;">Perth, WA</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:44px 40px 0 40px;">
          <div style="font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:2px;color:#ffae24;text-transform:uppercase;">&#9679;&nbsp; Message received</div>
          <h1 style="margin:18px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:40px;line-height:1.02;font-weight:800;letter-spacing:-1.5px;color:#e0d3bd;">Thanks, ${esc(first)}.<br>I'll be in touch.</h1>
          <p style="margin:22px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#e0d3bd;opacity:0.8;">
            Your message is in my inbox and I'll get back to you personally, usually within one business day. No auto-pilot, no sales team. Just me.
          </p>
        </td></tr>
        <tr><td style="padding:32px 40px 0 40px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1d1c1b;border-radius:20px;">
            <tr><td style="padding:24px 26px;">
              <div style="font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:2px;color:#736b5e;text-transform:uppercase;">Need me sooner?</div>
              <p style="margin:10px 0 16px 0;font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#e0d3bd;">If anything comes up in the meantime, reach me directly:</p>
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="padding:0 10px 10px 0;"><a href="${CONTACT.phoneHref}" style="display:inline-block;background:#ffae24;color:#111111;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:999px;">Call ${CONTACT.phone}</a></td>
                <td style="padding:0 0 10px 0;"><a href="mailto:${CONTACT.email}" style="display:inline-block;border:1px solid #e0d3bd;color:#e0d3bd;font-family:Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:11px 20px;border-radius:999px;">${CONTACT.email}</a></td>
              </tr></table>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:32px 40px 0 40px;">
          <div style="font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:2px;color:#736b5e;text-transform:uppercase;">What you sent</div>
          <div style="margin-top:12px;padding:0 0 0 16px;border-left:3px solid #ffae24;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:1.6;color:#e0d3bd;opacity:0.75;white-space:pre-wrap;">${esc(message)}</div>
        </td></tr>
        <tr><td style="padding:40px 40px 36px 40px;">
          <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:1.5;color:#e0d3bd;">Talk soon,<br><strong>Travis</strong></p>
          <p style="margin:24px 0 0 0;padding-top:20px;border-top:1px solid #3b3730;font-family:Menlo,Consolas,monospace;font-size:11px;letter-spacing:1px;color:#736b5e;">
            Designer, developer &amp; creative consultant · <a href="${CONTACT.site}" style="color:#e0d3bd;text-decoration:none;">travis.work</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, text };
}
