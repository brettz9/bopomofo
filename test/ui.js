// https://github.com/DevExpress/testcafe
// https://devexpress.github.io/testcafe/documentation/test-api/
// https://github.com/helen-dikareva/axe-testcafe
import {Selector, ClientFunction} from 'testcafe';

const voiceSpeaking = ClientFunction(() => {
  return window.speechSynthesis.speaking;
});

fixture`TestCafe UI tests`
  .page`http://localhost:8049/tools/speech-tester/`;

test('Speech Tester: Get sounds starting', async (t) => {
  const buttonPlaySelector = Selector('button#play');
  await t.expect(
    buttonPlaySelector.exists
  ).ok().click(buttonPlaySelector);
  await t.expect(
    voiceSpeaking()
  ).ok();
});
