export default class AbstractView extends HTMLElement {
  constructor() {
    super();
  }
  setTitle(title) {
    document.title = title;
  }
}
