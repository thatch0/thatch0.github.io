var pgraph = 'in principe erat Verbum et Verbum erat apud Deum et Deus erat Verbum. hoc erat in principe apud Deum';
var p = waitForElementById("mainContent");

async function waitForElementById(id) {
    var element = await document.getElementById(id);
    return element;
}

function vSearch(word, text) {
    var regWord = '/' + word + '/i'
    return text.match(regWord)
}

function vSearch(root, text, delimiter) {
    const d = delimiter ?? null
    if (d === null) {
        var regWord = RegExp(root, "i")
        return text.match(regWord)
    }
    else {
       var regWord = root + '[a-zA-Z]*' + delimiter + '+'
        if (typeof(delimiter) != "string") {
            return
        }
        return vSearch(regWord, text)
    }
}

const words = vSearch('princip', pgraph, '[\\.\\s]')
const endings = { ".+": "ns", "is": "gs", "i": "ds", "em": "acs", "e": "abs"}