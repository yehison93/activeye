const useChangeChannels = (channelCurrent, listChannels, actions) => {
  const changeChannel = (typeChannels) => {
    const channelIndex = listChannels.findIndex((item) =>
      item.name.includes(channelCurrent)
    );
    if (channelIndex !== -1) {
      if (typeChannels) {
        actions(listChannels[channelIndex + 1]);
      } else {
        actions(listChannels[channelIndex - 1]);
      }
    }
  };
  return changeChannel;
};

export default useChangeChannels;
