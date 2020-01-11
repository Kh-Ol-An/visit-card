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

const Contacts = ({ content }) => {
  const [tel, setTel] = useState(null);

  useEffect(() => {
    // function setTelephone() {
    //   content.lang === 'en' && setTel('Telephone');
    //   content.lang === 'ua' && setTel('Телефон');
    //   content.lang === 'ru' && setTel('Телефон');
    // }
    content.lang === 'en' && setTel('Telephone');
    (content.lang === 'ua' || content.lang === 'ru') && setTel('Телефон');
    // content.lang === 'ru' && setTel('Телефон');
    // if (content.lang === 'en') {
    //   setTel('Telephone');
    // } else if (content.lang === 'ua') {
    //   setTel('Телефон');
    // } else if (content.lang === 'ru') {
    //   setTel('Телефон');
    // }
    // setTelephone();
  });

  return (
    <div className={s.main}>
      <Header />

      <a className={s.phone} title="Telephone" href="tel:+380508899268">
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

      {/* VIBER НА ПК */}
      <a
        className={s.viber}
        title="Viber"
        href="viber://chat?number=+380508899268"
      >
        <img src={viber} alt="viber-icon" width="50" />
        Viber
      </a>
      {/* VIBER НА МОБИЛЬНЫХ */}
      {/* <a
        className={s.telegram}
        title="Viber"
        href="viber://add?number=380508899268"
      >
        Viber
      </a> */}

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
        href="https://github.com/Kh-Ol-An"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={github} alt="github-icon" width="50" />
        GitHub
      </a>

      <a
        className={s.linkedin}
        title="Linkedin"
        href="https://www.linkedin.com/in/kh-ol-an/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={linkedin} alt="linkedin-icon" width="50" />
        Linkedin
      </a>

      {/* <a className={s.website} title="To the main" href="http://kholan.tech/">
        <img src={website} alt="website-icon" width="50" />
        kholan.tech
      </a> */}
    </div>
  );
};

Contacts.propTypes = {
  content: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = store => ({
  content: getContent(store),
});

export default connect(mapStateToProps)(Contacts);
