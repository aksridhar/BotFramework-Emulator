//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import { UserSettings } from '@bfemulator/app-shared';
import { ADD_USERS, SET_CURRENT_USER, UserAction, UserPayload } from '../actions/userActions';

export function usersReducer(state: UserSettings = {}, action: UserAction<UserPayload>) {
  switch (action.type) {

    case SET_CURRENT_USER:
      const usersById = Object.assign({}, state.usersById);
      const { user } = action.state;
      usersById[user.id] = user;
      return Object.assign({}, { currentUserId: user.id, usersById });

    case ADD_USERS: {
      let newUsersById = {};
      for (let key in action.state.users) {
        if (!action.state.users.hasOwnProperty(key)) {
          continue;
        }
        const user1 = action.state.users[key];
        newUsersById[user1.id] = user1;
      }
      return Object.assign({}, state, { usersById: newUsersById });
    }

    default:
      return state;
  }
}
