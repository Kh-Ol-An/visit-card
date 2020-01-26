import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getContent from '../../redux/content/contentSelectors';
import Header from '../Header/Header';
import phone from '../../assets/images/icon/phone.png';
import telegram from '../../assets/images/icon/telegram.png';
import viber from '../../assets/images/icon/viber.png';
import whatsapp from '../../assets/images/icon/whatsapp.png';
import skype from '../../assets/images/icon/skype.png';
import mail from '../../assets/images/icon/mail.png';
import github from '../../assets/images/icon/github.png';
import linkedin from '../../assets/images/icon/linkedin.png';
import s from './Contacts.module.css';

const Contacts = ({ contentStore }) => {
  const [tel, setTel] = useState(null);

  useEffect(() => {
    contentStore.lang === 'en' && setTel('Telephone');
    (contentStore.lang === 'ua' || contentStore.lang === 'ru') &&
      setTel('Телефон');
  }, [contentStore.lang]);

  const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(
    navigator.userAgent,
  );

  const [checkedHeader, setCheckedHeader] = useState(false);

  function handleDisactiveChecked({ target }) {
    !target.className.includes('Header') &&
      !target.className.includes('Languages') &&
      checkedHeader &&
      setCheckedHeader(false);
  }

  function handleKeyPressChecked({ keyCode }) {
    if (keyCode !== 27) return;
    checkedHeader && setCheckedHeader(false);
  }

  function onCheckedHeader(checked) {
    setCheckedHeader(checked);
  }

  return (
    <div
      className={s.main}
      role="button"
      tabIndex="0"
      onClick={handleDisactiveChecked}
      onKeyDown={handleKeyPressChecked}
    >
      <Header checkedHeader={checkedHeader} onCheckedHeader={onCheckedHeader} />

      <a className={s.phone} title={tel} href="tel:+380508899268">
        <img src={phone} alt="phone-icon" width="50" />
        {tel}
      </a>

      <a
        className={s.telegram}
        title="Telegram"
        href="tg://resolve?domain=@kholan"
      >
        <img src={telegram} alt="telegram-icon" width="50" />
        Telegram
      </a>

      {/* VIBER НА МОБИЛЬНЫЙ ИЛИ НА ПК */}
      {isMobile ? (
        <a
          className={s.viber}
          title="Viber"
          href="viber://add?number=+380508899268"
        >
          <img src={viber} alt="viber-icon" width="50" />
          Viber
        </a>
      ) : (
        <a
          className={s.viber}
          title="Viber"
          href="viber://chat?number=+380508899268"
        >
          <img src={viber} alt="viber-icon" width="50" />
          Viber
        </a>
      )}

      <a
        className={s.whatsapp}
        title="WhatsApp"
        href="whatsapp://send?phone=+380508899268"
      >
        <img src={whatsapp} alt="whatsapp-icon" width="50" />
        WhatsApp
      </a>

      <a className={s.skype} title="Skype" href="skype:hristenkoleg?chat">
        <img src={skype} alt="skype-icon" width="50" />
        Skype
      </a>

      <a className={s.mail} title="Mail" href="mailto:olegkhristenko@gmail.com">
        <img src={mail} alt="mail-icon" width="50" />
        E-mail
      </a>

      <a
        className={s.github}
        title="GitHub"
        href="https://github.com/Kh-Ol-An/visit-card"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={github} alt="github-icon" width="50" />
        GitHub
      </a>

      <a
        className={s.linkedin}
        title="Linkedin"
        href="https://linkedin.com/in/kh-ol-an/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={linkedin} alt="linkedin-icon" width="50" />
        Linkedin
      </a>
    </div>
  );
};

Contacts.propTypes = {
  contentStore: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  contentStore: getContent(store),
});

export default connect(mapStateToProps)(Contacts);
