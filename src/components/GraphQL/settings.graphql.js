import { gql } from '@apollo/client';

export const GET_SETTINGS = gql `
query Settings {
  settings {
    id
    options {
      siteTitle
      siteSubtitle
      currency
      logo {
        id
        thumbnail
        original
      }
      taxClass
      shippingClass
      seo {
        metaTitle
        metaDescription
        ogTitle
        ogDescription
        ogImage {
          id
          thumbnail
          original
        }
        twitterHandle
        twitterCardType
        metaTags
        canonicalUrl
      }
      google {
        isEnable
        tagManagerId
      }
      facebook {
        isEnable
        appId
        pageId
      }
    }
  }
  taxClasses {
    id
    name
  }
  shippingClasses {
    id
    name
  }
}
`
export const UPDATE_SETTINGS = gql `
mutation UpdateSettings($input: SettingsInput!) {
  updateSettings(input: $input) {
    id
    options {
      siteTitle
      siteSubtitle
      currency
      logo {
        id
        thumbnail
        original
      }
      taxClass
      shippingClass
      seo {
        metaTitle
        metaDescription
        ogTitle
        ogDescription
        ogImage {
          id
          thumbnail
          original
        }
        twitterHandle
        twitterCardType
        metaTags
        canonicalUrl
      }
      google {
        isEnable
        tagManagerId
      }
      facebook {
        isEnable
        appId
        pageId
      }
    }
  }
}
`
