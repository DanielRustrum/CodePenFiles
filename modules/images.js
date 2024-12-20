//SECTION: Data

const Tags = {
    "Michael Dam": "https://unsplash.com/@michaeldam",
    "Aiony Haust": "https://unsplash.com/@aiony",
    "Jessica Felicio": "https://unsplash.com/@jekafe",
    "Ian Dooley": "https://unsplash.com/@sadswim",
    "Brooke Cagle": "https://unsplash.com/@brookecagle",
    "Erik Lucatero": "https://unsplash.com/@erik_lucatero",
    "averie woodard": "https://unsplash.com/@averieclaire",
    "Alexandru Zdrobău": "https://unsplash.com/@alexandruz",
    "Seth Doyle": "https://unsplash.com/@sxth",
    "Rayul": "https://unsplash.com/@rayul",
    "Tachina Lee": "https://unsplash.com/@chne_",
    "Dami Adebayo": "https://unsplash.com/@dammypayne",
    "Lidia Stawinska": "https://unsplash.com/@liliess",
    "Angela Bailey": "https://unsplash.com/@angelabaileyy",
    "Artists Eyes": "https://unsplash.com/@artistseyes",
    "Erika M": "https://unsplash.com/@epsika",
    "Kenny Eliason": "https://unsplash.com/@neonbrand",
    "Farhan Abas": "https://unsplash.com/@farhanabas",
    "Macy Nguyen": "https://unsplash.com/@macynguyen",
    "Rafael Otaki": "https://unsplash.com/@otaki",
    "Dimaz Fakhruddin": "https://unsplash.com/@dimazfakhr",
    "Rafael AS Martins": "https://unsplash.com/@rafael_as_martins",
    "Tara-mae Miller": "https://unsplash.com/@taramaemil",
    "Sandra-Beatrice Molnar": "https://unsplash.com/@msandrab",
    "Mohammad Mardani": "https://unsplash.com/@mmdam20",
    "Mia de Jesus": "https://unsplash.com/@mia_dj",
    "Alejandra Cifre González": "https://unsplash.com/@alexciland",
    "Jonathan Kemper": "https://unsplash.com/@jupp",
    "Ish Consul": "https://unsplash.com/@ishconsul",
    "Ben den Engelsen": "https://unsplash.com/@benjeeeman",
    "Luca Pennacchioni": "https://unsplash.com/@lucaromeo"
}

const profiles_tag_relations = [
    "Michael Dam",
    "Aiony Haust",
    "Jessica Felicio",
    "Ian Dooley",
    "Erik Lucatero",
    "Alexandru Zdrobău",
    "Brooke Cagle",
    "Brooke Cagle",
    "Dami Adebayo",
    "Rayul",
    "Seth Doyle",
    "Tachina Lee"
]

const _setImageData = (author, place, region) => ( {
    author,
    place,
    region
})

const location_image_data = [
    _setImageData("Lidia Stawinska", "Gdańsk", "Poland"),
    _setImageData("Angela Bailey", "Calgary", "Canada"),
    _setImageData("Artists Eyes", "Winterberg", "Germany"),
    _setImageData("Kenny Eliason", "Las Vegas", "United States"),
    _setImageData("Farhan Abas", "Sambirejo", "Indonesia"),
    _setImageData("Macy Nguyen", "Québec City", "Canada"),
    _setImageData("Rafael Otaki", "Tochigi", "Japan"),
    _setImageData("Dimaz Fakhruddin", "Spadaa Koffie", "Indonesia"),
    _setImageData("Erika M", "Hanoi", "Vietnam"),
    _setImageData("Rafael AS Martins", "Budapest", "Hungary"),
    _setImageData("Tara-mae Miller", "Chino Hills", "United States"),
    _setImageData("Sandra-Beatrice Molnar", "Cluj-Napoca", "Romania"),
    _setImageData("Mohammad Mardani", "İstanbul", "Türkiye"),
    _setImageData("Mia de Jesus", "Palawan", "Philippines"),
    _setImageData("Tara-mae Miller", "Barcelona", "Spain"),
    _setImageData("Alejandra Cifre González", "Islas Baleares", "España"),
    _setImageData("Macy Nguyen", "Montreal", "Canada"),
    _setImageData("Jonathan Kemper", "Lübeck", "Germany"),
    _setImageData("Ish Consul", "Hallstatt", "Austria"),
    _setImageData("Ben den Engelsen", "Nazaré", "Portugal"),
    _setImageData("Luca Pennacchioni", "Sermoneta", "Italy")
]

const asset_url = "https://daniel.rustrum.net/CodePenFiles/assets"


//SECTION: Functions
/**
 * @private Module-only Function
 * @param {*} type 
 * @returns {[number, Function, Function]}
 */
function imageTypeData(type) {
    const getURL = (index) => asset_url + `/${type}/${index}.jpg`
    
    switch (type) {
        case 'profiles':
            var getData = (index) => {
                const author = profiles_tag_relations[index]
                const author_url = Tags[author]
                return {author, author_url}
            }
            return [13, getData, getURL]
        case 'landscapes':
            var getData = (index) => {
                let meta = location_image_data[index]
                const author_url = Tags[meta.author]
                meta.author_url = author_url
                return meta
            }
            return [21, getData, getURL]
        default:
            return [0, null, null]
    }
}

/** 
 * 
 * @param {"profiles" | "landscapes"} type 
 * @param {number} length 
 * @param {boolean} data 
 * @param {boolean} minimize_repeats 
 * @returns {Array<{
 *       url: string, 
 *       data?: {
 *          author: string, 
 *           author_url: string,
 *           place?: string,
 *           region?: string
 *      }
 * }>}
 */
function getRandomAssetArray(type, length, data = false, minimize_repeats = false) {
    const result = []
    const repeat_tracker = []
    const [asset_length, imageData, getURL] = imageTypeData(type)

    const getIndex = () => {
        if(minimize_repeats) {
            if(repeat_tracker.length === asset_length) repeat_tracker = [];
            
            let retries = asset_length + 10
            let random_int = 0
    
            while(stop_iterator <= 0) {
                random_int = Math.floor(Math.random() * asset_length) + 1
                
                if(!repeat_tracker.includes(random_int)) {
                    repeat_tracker.push(random_int)
                    return random_int
                }
                
                retries -= 1
            }
            
            return random_int
        } else {
            return Math.floor(Math.random() * asset_length) + 1
        }
    }

    for (let index = 0; index < length; index++) {
        const random_int = getIndex();

        if(data)
            result.push({
                url: getURL(random_int),
                data: imageData(random_int),
            });
        else
            result.push({
                url: getURL(random_int)
            });
    }

    return result
}

/**
 * 
 * @param {*} type 
 * @param {*} data 
 * @returns {{
 *       url: string, 
 *       data?: {
 *          author: string, 
 *           author_url: string,
 *           place?: string,
 *           region?: string
 *      }
 * }}
 */
function getRandomAsset(type, data=false) {
    const [asset_length, imageData, getURL] = imageTypeData(type)
    const random_int = Math.floor(Math.random() * asset_length) + 1

    if(data)
        return {
            url: getURL(random_int),
            data: imageData(random_int),
        };
    else
        return { 
            url: getURL(random_int) 
        };
}

CPEC._hidden.export("images", {
    getRandomAssetArray,
    getRandomAsset
})