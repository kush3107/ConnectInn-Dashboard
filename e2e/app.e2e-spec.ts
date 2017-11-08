import { ConnectInnDashPage } from './app.po';

describe('connect-inn-dash App', () => {
  let page: ConnectInnDashPage;

  beforeEach(() => {
    page = new ConnectInnDashPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
