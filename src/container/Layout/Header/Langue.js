import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'

const Langue = () => {
  const languages = [
    {
      code: 'fr',
      name: 'Français',
      country_code: 'fr',
    },
    {
      code: 'en',
      name: 'English',
      country_code: 'us',
    },
    {
      code: 'ar',
      name: 'العربية',
      dir: 'rtl',
      country_code: 'ma',
    },
  ]

  const currentLanguageCode = cookies.get('i18next') || 'en'
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode)
  const { t } = useTranslation()

  const releaseDate = new Date('2021-03-07')
  const timeDifference = new Date() - releaseDate
  const number_of_days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

  useEffect(() => {
    console.log('Setting page stuff')
    document.body.dir = currentLanguage.dir || 'ltr'
    document.body.lang = currentLanguageCode || 'en'
    document.title = t('app_title')
  }, [currentLanguage, t])

  return (
    <div className="dropdown">
    <button
      className="dropdown-toggle"
      type="button"
      id="dropdownMenuButton1"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fas fa-globe-americas"></i>
      {currentLanguage.name || English}
    </button>
    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      {/* <li>
        <span className="dropdown-item-text">{t('language')}</span>
      </li> */}
      {languages.map(({ code, name, country_code }) => (
        <li key={country_code}>
          <a
            href=""
            className={classNames('dropdown-item ' + code, {
              disabled: currentLanguageCode === code,
            })}
            onClick={() => {
              i18next.changeLanguage(code)
            }}
          >
            <span
              className={`flag-icon flag-icon-${country_code} mx-2`}
              style={{
                opacity: currentLanguageCode === code ? 0.5 : 1,
              }}
            ></span>
            {name}
          </a>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Langue;
