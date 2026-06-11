const useChangeChannels = (channelCurrent, listChannels, actions) => {
  const changeChannel = (typeChannels) => {
    const channelIndex = listChannels.findIndex((item) =>
      item.name.includes(channelCurrent)
    );

    if (channelIndex === -1) return;

    if (typeChannels === "next") {
      // FIX: antes hacía listChannels[channelIndex + 1] sin verificar el límite.
      // Al estar en el último canal, devolvía undefined y actions(undefined)
      // causaba un crash en attachVideo al intentar hacer undefined.url
      // Ahora navega de forma circular: del último vuelve al primero.
      const nextIndex = (channelIndex + 1) % listChannels.length;
      actions(listChannels[nextIndex]);
    } else if (typeChannels === "prev") {
      // FIX: mismo problema en sentido inverso con el primer canal.
      // (0 - 1 + length) % length da el último índice correctamente.
      const prevIndex = (channelIndex - 1 + listChannels.length) % listChannels.length;
      actions(listChannels[prevIndex]);
    }
  };

  return changeChannel;
};

export default useChangeChannels;
