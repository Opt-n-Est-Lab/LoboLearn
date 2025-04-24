import { assert } from 'chai';
import * as cheerio from 'cheerio';
import { config } from '../../lib/config.js';
/**
 * Switches active user and loads assessment, returning the user's CSRF
 * token value from a form on the page
 */
export async function switchUserAndLoadAssessment(studentUser, assessmentUrl, formName, formContainer = 'body') {
    // Load config
    config.authUid = studentUser.uid;
    config.authName = studentUser.name;
    config.authUin = studentUser.uin;
    // Load assessment
    const res = await fetch(assessmentUrl);
    assert.isOk(res.ok);
    const page = await res.text();
    const $ = cheerio.load(page);
    // Find the form. We look in three places:
    // - A form with the given name.
    // - A form in the given container.
    // - The closest form to the given container.
    const form = $(`form[name="${formName}"]`).get(0) ??
        $(formContainer).find('form').get(0) ??
        $(formContainer).closest('form').get(0);
    // Extract the CSRF token from the form
    const csrfTokenElement = $(form).find('input[name="__csrf_token"]');
    assert.nestedProperty(csrfTokenElement[0], 'attribs.value');
    assert.isString(csrfTokenElement.attr('value'));
    const csrfToken = csrfTokenElement.attr('value'); // guaranteed to be string by assertion
    return { $, csrfToken };
}
//# sourceMappingURL=group.js.map