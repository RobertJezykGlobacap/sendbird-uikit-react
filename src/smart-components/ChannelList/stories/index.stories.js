import React, { useState, useCallback } from 'react';

import Sendbird from '../../../lib/Sendbird';
const appId = process.env.STORYBOOK_APP_ID;
const userId = process.env.STORYBOOK_USER_ID || 'sendbird';

import ChannelList from '../../ChannelList';
import { getSdk } from '../../../lib/selectors';
import withSendBird from '../../../lib/SendbirdSdkContext';

export default { title: 'ChannelList' };

const defaultQueries = { channelListQuery: {includeEmpty: true} };

export const IndependentChannelList = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '100vh' }}>
      <ChannelList queries={defaultQueries} />
    </div>
  </Sendbird>
);

export const ChannelListWithSearchBox = () => {
  const [queries, setQueries] = useState({
    channelListQuery: {
      includeEmpty: true,
      nicknameContainsFilter: '',
    }
  });

  const onChannelSearch = searchString => {
    setQueries({
      ...queries,
      channelListQuery: {
        ...queries.channelListQuery,
        nicknameContainsFilter: searchString,
      },
    });
  };

  return (
    <Sendbird
      appId={appId}
      userId={userId}
    >
      <div style={{ height: '100vh' }}>
        <ChannelList
          onChannelSearch={onChannelSearch}
          showChannelSearchBox
          queries={queries}
        />
      </div>
    </Sendbird>
  );
};

export const OneToOneChannelList = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '100vh' }}>
      <ChannelList queries={defaultQueries} oneToOneChannel />
    </div>
  </Sendbird>
);

const MyCustomPreview = ({ channel, onLeaveChannel }) => (
  <div style={{ border: '1px solid gray' }}>
    <img height="20px" width="20px" src={channel.coverUrl} />
    <button
      onClick={() => {
        const leaveChannelCb = () => { console.warn('Leave channel success') }
        onLeaveChannel(channel, leaveChannelCb);
      }}
    >Leave</button>
  </div>
);

export const CustomChannelPreview = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '520px' }}>
      <ChannelList
        renderChannelPreview={MyCustomPreview}
        queries={defaultQueries}
        onChannelSelect={(c) => { console.info(c); }}
      />
    </div>
  </Sendbird>
);

export const DisableUserProfile = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '520px' }}>
      <ChannelList
        queries={defaultQueries}
        disableUserProfile
      />
    </div>
  </Sendbird>
);

export const RenderUserProfile = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '520px' }}>
      <ChannelList
        queries={defaultQueries}
        renderUserProfile={({ user }) => (
          <div>{user.userId}</div>
        )}
      />
    </div>
  </Sendbird>
);

const MyCustomHeader = () => (
  <div>Hello my friends</div>
);

export const CustomChannelListHeader = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '520px' }}>
      <ChannelList
        queries={defaultQueries}
        renderHeader={MyCustomHeader}
        onChannelSelect={(c) => { console.info(c); }}
      />
    </div>
  </Sendbird>
);

export const CustomSort = () => {
  const channelSort = useCallback((channels) => {
    if (channels.length === 0 ) {
      return channels;
    }

    const channel = channels.find(c => c.name === 'hidden 3');

    if (!channel) {
      return channels;
    }

    const otherChannels = channels.filter(c => c.url !== channel.url);

    otherChannels.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
    });

    return [channel, ...otherChannels];
  }, []);
  return (
    <Sendbird
      appId={appId}
      userId={userId}
    >
      <div style={{ height: '520px' }}>
        <ChannelList
          queries={defaultQueries}
          sortChannelList={channelSort}
        />
      </div>
    </Sendbird>
  )};

export const EditProfile = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '520px' }}>
      <ChannelList
        queries={defaultQueries}
        onThemeChange={(theme) => {
          alert(`New theme is: ${theme}`);
        }}
        onProfileEditSuccess={(user) => {
          alert(`New nickname is: ${user.nickname}`);
        }}
        onChannelSelect={(c) => { console.info(c); }}
        allowProfileEdit
        disableUserProfileNameChange
        showChangeThemeToggle
      />
    </div>
  </Sendbird>
);

const ChannelWithOnBeforeCreateChannel = ({ sdk }) => (
  <div style={{ height: '520px' }}>
    <ChannelList
      queries={defaultQueries}
      onBeforeCreateChannel={(selectedUsers) => {
        if (!sdk || !sdk.GroupChannelParams) { return }
        const params = new sdk.GroupChannelParams();
        params.addUserIds(selectedUsers);
        // params.isBroadcast = true;
        params.operatorUserIds = [...selectedUsers, userId];
        params.name = "custom name";
        return params;
      }}
    />
  </div>
)

const ConnectedChannelList = withSendBird(ChannelWithOnBeforeCreateChannel, (store) => ({
  sdk: getSdk(store),
}))

export const OnBeforeCreateChannel = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <ConnectedChannelList />
  </Sendbird>
);

export const QueryParamsForChannelList = () => {
  const [query, setquery] = useState(false);
  return (
    <Sendbird
      appId={appId}
      userId={userId}
    >
      <button onClick={() => { setquery(true); }}>
        Click to change query
      </button>
      <div style={{ height: '520px' }}>
        <ChannelList
          queries={{
            channelListQuery: query ? {
              includeEmpty: true,
            }: null,
            applicationUserListQuery: {
              limit: 30,
              // userIdsFilter: ['hoon500'],
              metaDataKeyFilter: 'areaGuid',
            },
          }}
        />
      </div>
    </Sendbird>
  );
};

export const ChannelListCustomStringSet = () => (
  <Sendbird
    appId={appId}
    userId={userId}
  >
    <div style={{ height: '100vh' }}>
      <ChannelList
        queries={defaultQueries}
        addChannelStringSet={{
          headerText: 'Custom Header',
          groupLabelText: 'Custom Group Label',
        }}
        channelPreviewStringSet={{
          leaveChannelText: 'Custom Leave Channel Text',
        }}
        editUserProfileStringSet={{
          userNameLabelText: 'Name',
        }}
        allowProfileEdit
      />
    </div>
  </Sendbird>
);
