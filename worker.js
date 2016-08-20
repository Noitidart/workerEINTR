var lib = ctypes.open('libc.so.6');
var read = lib.declare('read', ctypes.default_abi, ctypes.ssize_t, ctypes.int, ctypes.void_t.ptr, ctypes.size_t);
var pipe = lib.declare('pipe', ctypes.default_abi, ctypes.int, ctypes.int.array(2));
var write = lib.declare('write', ctypes.default_abi, ctypes.ssize_t, ctypes.int, ctypes.void_t.ptr, ctypes.size_t);

var pfd = ctypes.int.array(2)();
var rez_pipe = pipe(pfd);
console.log('rez_pipe:', rez_pipe);
if (rez_pipe.toString() === '-1') {
	throw new Error('failed to `pipe`, errno: ' + ctypes.errno);
}

var pipe_r = pfd[0];
var pipe_w = pfd[1];
console.log('pipe_r:', pipe_r, 'pipe_w:', pipe_w);

var i=0;
while (i++<100) {
	var buf = ctypes.char.array(10)();
	var rez_read = read(pipe_r, buf, buf.constructor.size);
	if (rez_read.toString() === '-1') {
		if (ctypes.errno === 4) {
		    console.warn('got EINTR');
		} else {
			throw new Error('failed to `read`, for non-EINTR errno: ' + ctypes.errno);
		}
	} else {
		var len = rez_read;
		console.log('succesfully read, len:', len);
	}
}
