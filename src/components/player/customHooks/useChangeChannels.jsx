const useChangeChannels = (channelCurrent, listChannels, actions) => {
  const changeChannel = (typeChannels) => {
    const channelIndex = listChannels.findIndex((item) =>
      item.name.includes(channelCurrent)
    );
    if (channelIndex !== -1) {
      if (typeChannels === "next") {
        actions(listChannels[channelIndex + 1]);
      } else if (typeChannels === "prev") {
        actions(listChannels[channelIndex - 1]);
      }
    }
  };
  return changeChannel;
};

export default useChangeChannels;
