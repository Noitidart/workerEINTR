var gWorker;

function install() {}
function uninstall() {}

function startup(aData, aReason) {

	gWorker = new ChromeWorker('chrome://workereinter/content/worker.js');

}

function shutdown(aData, aReason) {

	if (aReason == APP_SHUTDOWN) { return }

	gWorker.terminate();
}
