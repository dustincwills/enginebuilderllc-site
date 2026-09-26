import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../tossless/email-confirmed.html', import.meta.url), 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(scripts.length, 1, 'page should have one inline script');

function render(search = '', hash = '') {
  const nodes = Object.fromEntries(
    ['status-title', 'status-message', 'next-step', 'year'].map((id) => [id, { textContent: '' }]),
  );
  const replaced = [];
  const document = {
    title: '',
    getElementById: (id) => nodes[id],
  };
  const window = { location: { search, hash, pathname: '/tossless/email-confirmed.html' } };
  const history = { replaceState: (...args) => replaced.push(args) };
  runInNewContext(scripts[0][1], { document, window, history, URLSearchParams, Date });
  assert.equal(replaced.length, 1, 'Auth parameters should be removed from browser history');
  assert.equal(replaced[0][2], '/tossless/email-confirmed.html');
  return { title: nodes['status-title'].textContent, message: nodes['status-message'].textContent };
}

assert.equal(render('', '#access_token=sample&refresh_token=sample&type=signup').title, 'Email confirmed');
assert.equal(render('', '#access_token=sample&refresh_token=sample&type=invite').title, 'Invitation accepted');
assert.notEqual(render('', '#access_token=sample&refresh_token=sample&type=recovery').title, 'Email confirmed');
assert.notEqual(render('', '#error=access_denied&error_code=otp_expired&type=signup').title, 'Email confirmed');
assert.notEqual(render('', '#type=signup').title, 'Email confirmed');
assert.notEqual(render().title, 'Email confirmed');
assert.match(render('', '#type=recovery').message, /password-reset link/i);

console.log('Email confirmation page states passed.');
