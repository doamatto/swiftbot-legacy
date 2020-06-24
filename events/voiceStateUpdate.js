module.exports.run = (djs, oldMember, newMember) => {
  let old = oldMember.voiceChannel;
  let newC = newMember.voiceChannel;
  if(old != undefined) {
    if(newC !== old) {
      if(old.members.has(client.user.id)) {
        if(old.members.size == 1) {
          old.leave();
        } // Ensures channel is empty
      } // Ensures user left current channel
    } // Ensures user left channel
  } // Ensures user didn't join channel
};