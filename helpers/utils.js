var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	length = 15;

function generateImageName(id, format) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result + id + "_" + Date.now() + "." + format;
}

function getBase64Data(base64){
	return base64.replace(/^data:image\/png;base64,/, "");
}

module.exports = {
	generateImageName: generateImageName,
	getBase64Data: getBase64Data
}