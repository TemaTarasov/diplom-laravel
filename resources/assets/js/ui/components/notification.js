import { template } from '../../helpers';

export const Notification = new class {
  constructor() {
    this.content = document.getElementById('notification');
  }

  /**
   * @param  {object} data
   * @return {HTML.Element}
   */
  notify(data) {
    const {
      type = 'alert',
      content,
      autoclose = {
        delay: 3000
      }
    } = data;

    let icon;
    let closeTimeout;

    switch (true) {
      case type === 'success':
        icon = '<i class="fas fa-check-circle"></i>';
        break;
      case type === 'warning':
        icon = '<i class="fas fa-exclamation-triangle"></i>';
        break;
      case type === 'error':
        icon = '<i class="fas fa-exclamation-circle"></i>';
        break;
      default:
        break;
    }

    const notitfication = template(this.template(icon), {
      type,
      content
    });

    if (autoclose) {
      closeTimeout = setTimeout(() => {
        this.content.removeChild(notitfication);
      }, autoclose.delay);
    }

    notitfication.querySelector('.action i').addEventListener('click', e => {
      e.preventDefault();

      notitfication.style.transform = 'translateX(250%)';
      clearTimeout(closeTimeout);
      setTimeout(() => {
        this.content.removeChild(notitfication);
      }, 150);
    }, true);

    this.content.insertBefore(notitfication, this.content.firstChild);
    setTimeout(() => {
      notitfication.style.transform = 'none';
    });

    return notitfication;
  }

  /**
   * @param  {string} icon
   * @return {template}
   */
  template(icon) {
    return `
      <div class="notification %type%" style="transform: translateX(250%);">
        <div class="notification-wrapper">
          ${ icon ? `<div class="notification-icon">${icon}</div>` : ''}
          <div class="notification-content">%content%</div>
        </div>
        <div class="action">
          <i class="fas fa-times"></i>
        </div>
      </div>
    `;
  }
}();
