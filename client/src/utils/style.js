import { css } from 'styled-components'

export const media = {
  'screen-sm-max': (...args) => css`
    @media (max-width: 768px) {
      ${ css(...args) }
    }`,
  'screen-sm-min': (...args) => css`
    @media (min-width: 768px) {
      ${ css(...args) }
    }`,
  'screen-lg-min': (...args) => css`
    @media (min-width: 1380px) {
      ${ css(...args) }
    }`,
  'screen-md-min': (...args) => css`
    @media (min-width: 1024px) {
      ${ css(...args) }
    }`,
  'min': (...args) => css`
    @media (min-width: 1024px) {
      ${ css(...args) }
    }`,
}

export const med = (min) => (...args) => css`
  @media (min-width: ${min}px) {
    ${ css(...args) }
  }`;
