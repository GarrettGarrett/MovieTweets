
export default async (req, res) => {

    if (req.method === 'POST') {
        let tweetID = req.body.tweet.id
        console.log("🚀 ~ file: getTweetEmbed.js ~ line 7 ~ req.body.actor", req.body.actor)

        let actor = req.body.actor.replaceAll(" ", "")
        let tweetURL = `https://twitter.com/${actor}/status/${tweetID}`
       

        var myHeaders = new Headers();
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        const response = await fetch(`https://publish.twitter.com/oembed?url=${tweetURL}&theme=dark&widget=Tweet`, requestOptions)
        const response_json = await response.json()
        if (response_json) {
            let embedFull = response_json.html
            let scriptIndex = embedFull.indexOf('\n<script async src=\"https://platform.twitter.com/widgets.js\" charset=\"utf-8\"></script>\n')
            let embedSlice = embedFull.slice(0, scriptIndex) //remove the script tag
            
            return res.status(200).json({ embedSlice })
        }
    }
}



