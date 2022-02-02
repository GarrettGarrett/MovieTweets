
export default async (req, res) => {

    if (req.method === 'POST') {
        let actor = req.body.actor
        // //console.log("🚀 ~ file: getTwitterID.js ~ line 6 ~ twitterLink", actor)
        actor = actor.replaceAll(" ", "")

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${process.env.BEARER_TOKEN}`);
       
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(`https://api.twitter.com/2/users/by/username/${actor}`, requestOptions)
        // //console.log("🚀 ~ file: getTwitterID.js ~ line 18 ~ response", response)
        
        const response_json = await response.json()
        if (response_json?.data?.id) {
            let id = response_json.data.id
            return res.status(200).json({ id })
        } else {
            return res.status(200).json({ success: false })
        }
        
    }
}


