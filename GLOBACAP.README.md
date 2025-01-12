Globacap fork of [sendbird-uikit](https://www.npmjs.com/package/globacap-sendbird-uikit) includes changes:
- to `<ChannelList />` component, in the form of extra `oneToOneChannel` boolean prop (default value `false`), which can be passed to limit the choice of people participating in conversation to only 1.
- to `<ChatHeader />` component, by adding `showInfoIcon` prop to hide/remove Info Icon (default value `true`). This prop is passed from `<Channel />`, which is also exposed with same name.
- Adding Channel Search functionality to `<ChannelList />` component, which now has 2 extra props: `showChannelSearchBox` (default false) & `onChannelSearch` (callback function to fire on input change), these props are passed to new `<SearchBox />` component
- in relation to above `lodasg.debounce` is added to help with future throttle to above compnent, to reduce number of api requests when user types to search for a channel
- `<ChannelList />` got added string set for `<AddChannel />` modal text nodes. Prop `addChannelStringSet` is an object containing 2 keys: `headerText` & `groupLabelText`
- `<ChannelList />` got added string set for `<ChannelPreviewAction />` component text nodes. Prop `channelPreviewStringSet` is an object containing a key: `leaveChannelText`
- `<ChannelList />` got added string set for `<EditUserProfile />` modal text nodes. Prop `editUserProfileStringSet` is an object containing a key: `userNameLabelText`
- total members count in `<ChannelPreview />` will not show if it's lower than 3
- `disableUserProfileNameChange` prop added for `<ChannelList />` for disabling/enabling editiing User Profile name
- `data-channel-url` custom data attribute rendered into the DOM in ChannelPreview component for easier debugging/logging
- changes for suppressing `markAsDelivered` error on an origin branch in v2.7.1, brought to the fork, to keep fork in sync with a source and get rid of console error - [v2.7.1 changes](https://github.com/sendbird/sendbird-uikit-react/pull/143/files)
- `showChangeThemeToggle` prop added for `<ChannelList />` for showing/hiding theme toggle in `<EditUserProfile />` component
- added member's email address to `<ChannelPreview />` & `<UserListItem />` when exactly 2 members in channel

2.7.11 changes
- added new `disableAttachments` prop to `<MessageInput />` component

2.8.2 
- Adding <SearchBox /> for User Search to ChannelList component. Requires `showUserSearchBox` & `onUserSearch`