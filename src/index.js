
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom';

// i18next
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import 'bootstrap/dist/js/bootstrap.js'
import Loader from "./components/UI/LOADER"

import App from "./App";



import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  ApolloProvider,
} from "@apollo/client";
const URL = "http://localhost/pickbazar-laravel/api/public/graphql";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
const httpLink = createUploadLink({
  uri: URL,
});

import { setContext } from '@apollo/client/link/context';
const authLink = setContext((_, { headers }) => {const token = localStorage.getItem('id_token');return {headers: {...headers,authorization: token ? `Bearer ${token}` : '',},}});

const client = new ApolloClient({
  // uri: authLink.concat(httpLink),
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});
 

// i18Next.js
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'ar', 'fr'],
    fallbackLng: 'en',
    debug: false,
    // Options for language detector
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  })

const loadingMarkup = (
  <Loader/>
)


ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </Suspense>,
  document.getElementById("root")
);