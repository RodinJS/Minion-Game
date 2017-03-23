(function (global) {

	var paths = {
		'npm:': '../lib/dist/' //RO-548-Game
	};

	var map = {
		'rodin/core': 'npm:core'	
	};	

	var meta = {
		'build/index.js': { authorization: true }
	};

	var packages = {
		'dist': { main: 'index.js', defaultExtension: 'js' },
		'rodin/core': { main: 'index.js', defaultExtension: 'js' }
	};

	var moduleNames = [
		'core/error',
        'core/time',
        'core/scene',
        'core/sculpt',
        'core/sculpt/elements',
        'core/messenger',
        'core/eventEmitter',
        'core/set',
        'core/initializer',
        'core/constants',
        'core/rodinEvent',
        'core/raycaster',
        'core/controllers',
        'core/animation',
        'core/button',
        'core/gamePad',
        'core/utils',
        'core/loader',
        'core/plugin',
        'core/particleSystem',
        'core/utils/math',
        'core/video',
		'core/eventEmitter'
	];

	function packIndex(moduleName) {
		packages['' + paths['npm:'] + moduleName + ''] = { main: 'index.js', defaultExtension: 'js' };
	}

	moduleNames.forEach(packIndex);

	var config = {
		paths: paths,
		map: map,
		packages: packages,
		meta: meta
	};

	System.config(config);

})(this);