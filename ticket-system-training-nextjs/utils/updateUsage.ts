

const updateUsage = async (
    serverAction:any, 
    setState:() => void
) => {
  try {
    const used = await serverAction();

    if(!used) {
      return
    }

    setState()
  } catch(error) {
    console.log(error);
  }
}

export default updateUsage