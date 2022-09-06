/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow strict
 */

import NativePlatformConstantsAndroid from './NativePlatformConstantsAndroid';

export type PlatformSelectSpec<A, N, D> = {
  android?: A,
  native?: N,
  default?: D,
  ...
};

const Platform = {
  __constants: null,
  OS: 'android',
  // $FlowFixMe[unsafe-getters-setters]
  get Version(): number {
    // $FlowFixMe[object-this-reference]
    return this.constants.Version;
  },
  // $FlowFixMe[unsafe-getters-setters]
  get constants(): {|
    isTesting: boolean,
    reactNativeVersion: {|
      major: number,
      minor: number,
      patch: number,
      prerelease: ?number,
    |},
    Version: number,
    Release: string,
    Serial: string,
    Fingerprint: string,
    Model: string,
    ServerHost?: string,
    uiMode: string,
    Brand: string,
    Manufacturer: string,
  |} {
    // $FlowFixMe[object-this-reference]
    if (this.__constants == null) {
      // $FlowFixMe[object-this-reference]
      this.__constants = NativePlatformConstantsAndroid.getConstants();
    }
    // $FlowFixMe[object-this-reference]
    return this.__constants;
  },
  // $FlowFixMe[unsafe-getters-setters]
  get isTesting(): boolean {
    if (__DEV__) {
      // $FlowFixMe[object-this-reference]
      return this.constants.isTesting;
    }
    return false;
  },
  // $FlowFixMe[unsafe-getters-setters]
  get isTV(): boolean {
    // $FlowFixMe[object-this-reference]
    return this.constants.uiMode === 'tv';
  },
  select: <A, N, D>(spec: PlatformSelectSpec<A, N, D>): A | N | D =>
    'android' in spec
      ? // $FlowFixMe[incompatible-return]
        spec.android
      : 'native' in spec
      ? // $FlowFixMe[incompatible-return]
        spec.native
      : // $FlowFixMe[incompatible-return]
        spec.default,
};

module.exports = Platform;
