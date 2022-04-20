Globacap fork of [sendbird-uikit](https://www.npmjs.com/package/globacap-sendbird-uikit) includes changes:
- to `<ChannelList />` component, in the form of extra `oneToOneChannel` boolean prop (default value `false`), which can be passed to limit the choice of people participating in conversation to only 1.
- to `<ChatHeader />` component, by adding `showInfoIcon` prop to hide/remove Info Icon (default value `true`). This prop is passed from `<Channel />`, which is also exposed with same name.
- Adding Channel Search functionality to `<ChannelList />` component, which now has 2 extra props: `showChannelSearchBox` (default false) & `onChannelSearch` (callback function to fire on input change), these props are passed to new `<SearchBox />` component
- in relation to above `lodasg.debounce` is added to help with future throttle to above compnent, to reduce number of api requests when user types to search for a channel
- `<ChannelList />` got added string set for `<AddChannel />` modal text nodes. Prop `addChannelStringSet` is an object containing 2 keys: `headerText` & `groupLabelText`
- `<ChannelList />` got added string set for `<ChannelPreviewAction />` modal text nodes. Prop `channelPreviewStringSet` is an object containing a key: `leaveChannelText`
- total members count in `<ChannelPreview />` will not show if it's lower than 3