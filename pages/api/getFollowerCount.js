
export default async (req, res) => {

    if (req.method === 'POST') {
        let actor = req.body.actor
        // console.log("🚀 ~ file: getFollowerCount.js ~ line 8 ~ actor", actor) //Daniel_CraigFan
        


        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          
         
          
        // How to refresh this?
        //  - 
        const response = await fetch(`https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=${actor}`, requestOptions)
        // console.log("🚀 ~ file: getFollowerCount.js ~ line 15 ~ response", response)
        const response_json = await response.json()
        let followers_count = response_json[0].followers_count
        // console.log("🚀 ~ file: getFollowerCount.js ~ line 36 ~ followers_count", followers_count)
        
        if (response_json) {
            return res.status(200).json({ followers_count })
        }
    }
}


