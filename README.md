The bug is seen in worker.js

This is a bug on Linux systems where `read`, `select`, `poll` in a `ChromeWorker` errors and gives `errno` of `4` which is `EINTR`. I used to use this in my `inotify` file watcher, but its not working in latest Firefox builds. `subprocess.jsm` also does `poll` and `read` on a pipe but it doesn't seem to get `EINTR` - https://dxr.mozilla.org/mozilla-central/rev/4c05938a64a7fde3ac2d7f4493aee1c5f2ad8a0a/addon-sdk/source/lib/sdk/system/child_process/subprocess_worker_unix.js#200

### mozregression
```
39.0a1 - 2015-02-24 - good
39.0a1 - 2015-03-28 - good
40.0a1 - 2015-04-13 - good
40.0a1 - 2015-04-15 - good
xxxxxxxxxxxxxxxxxxxx
40.0a1 - 2015-04-16 - bad
40.0a1 - 2015-04-17 - bad
40.0a1 - 2015-04-21 - bad
40.0a1 - 2015-04-29 - bad

16:18.22 INFO: Narrowed nightly regression window from > [2015-04-15, 2015-04-17] (2 days) to [2015-04-15, 2015-04-16] > (1 days) (~0 steps left)
16:18.22 INFO: Got as far as we can go bisecting nightlies...
16:18.22 INFO: Last good revision: a6f7a33731bc (2015-04-15)
16:18.22 INFO: First bad revision: a35163f83d22 (2015-04-16)
16:18.22 INFO: Pushlog:
https://hg.mozilla.org/mozilla-central/pushloghtml?fromchange=a6f7a33731bc&tochange=a35163f83d22
```
