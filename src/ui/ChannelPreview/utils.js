import isToday from 'date-fns/isToday';

import format from 'date-fns/format';
import formatRelative from 'date-fns/formatRelative';
import isYesterday from 'date-fns/isYesterday';

import { truncateString } from '../../utils';
import { LabelStringSet } from '../Label';

export const getChannelTitle = (channel = {}, currentUserId, stringSet = LabelStringSet) => {
  const { name, members } = channel;

  if (!channel || (!name && !members)) {
    return stringSet.NO_TITLE;
  }
  if (name && name !== 'Group Channel') {
    return name;
  }
  if (members.length === 1) {
    return stringSet.NO_MEMBERS;
  }

  return members
    .filter(({ userId }) => userId !== currentUserId)
    .map(({ nickname }) => (nickname || stringSet.NO_NAME))
    .join(', ');
};

export const getLastMessageCreatedAt = (channel, locale) => {
  const createdAt = channel?.lastMessage?.createdAt;
  const optionalParam = locale ? { locale } : null;
  if (!createdAt) {
    return '';
  }
  if (isToday(createdAt)) {
    return format(createdAt, 'p', optionalParam);
  }
  if (isYesterday(createdAt)) {
    return formatRelative(createdAt, new Date(), optionalParam);
  }
  return format(createdAt, 'MMM dd', optionalParam);
};

export const getTotalMembers = (channel) => (
  channel && channel.memberCount
    ? channel.memberCount
    : 0
);

const getPrettyLastMessage = (message = {}) => {
  const MAXLEN = 30;
  const { messageType, name } = message;
  if (messageType === 'file') {
    return truncateString(name, MAXLEN);
  }
  return message.message;
};

export const getLastMessage = (channel) => (
  channel && channel.lastMessage
    ? getPrettyLastMessage(channel.lastMessage)
    : ''
);

export const getChannelUnreadMessageCount = (channel) => (
  (channel && channel.unreadMessageCount)
    ? channel.unreadMessageCount
    : 0
);

export const getEmailAddress = (channel, currentUserId) => {
  const { members } = channel;

  return members?.length === 2 ? members.find(({ userId }) => userId !== currentUserId).metaData.email : '';
};
