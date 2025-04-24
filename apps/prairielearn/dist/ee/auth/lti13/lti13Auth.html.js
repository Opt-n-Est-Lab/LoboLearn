import { html } from '@prairielearn/html';
import { HeadContents } from '../../../components/HeadContents.html.js';
import {} from '../../../lib/authn.js';
import {} from '../../../lib/db-types.js';
export const Lti13Test = ({ resLocals, lti13_claims, userInfo, lti13_instance, url, }) => {
    return html `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        ${HeadContents({ resLocals, pageTitle: 'LTI 1.3 test' })}
      </head>
      <body>
        <main class="container mb-4">
          <h1>LTI 1.3 authentication testing</h1>
          <p>
            Once you're satisfied, remove <code>?test</code> from the end of your configured
            <a href="${url.href}">OpenID Connection Initiation URL</a>
            to bypass this debugging report and continue to authentication.
          </p>
          <h2>Mapped LTI 1.3 claims</h2>
          <p>The user would be authenticated as:</p>
          <ul>
            <li><b>UID:</b> ${userInfo.uid} (<code>${lti13_instance.uid_attribute}</code>)
            <li><b>UIN:</b> ${userInfo.uin} (<code>${lti13_instance.uin_attribute}</code>)
            <li><b>Name:</b> ${userInfo.name} (<code>${lti13_instance.name_attribute}</code>)
            <li><b>Email:</b> ${userInfo.email} (<code>${lti13_instance.email_attribute}</code>)
          </ul>
          <h2>All LTI 1.3 claims</h1>
          <pre><code>${JSON.stringify(lti13_claims, null, 2)}</code></pre>
        </main>
      </body>
    </html>
  `.toString();
};
//# sourceMappingURL=lti13Auth.html.js.map