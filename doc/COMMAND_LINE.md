## Instrumenting offline

The server instruments JavaScript files on each request. It's possible to instrument offline your files running

    node instrument.js /var/www/myApp /var/www/myInstrumentedApp

You can then run the server with

    node server.js -d /var/www/myInstrumentedApp


### Supported options

* `-h` or `--help` list of options
* `-t` ot `test` run unit tests
* `--condition`, `--no-condition` enable or disable condition coverage. By default it's enabled.
* `--function`, `--no-function` enable or disable function coverage. By default it's disabled.
* `-i` or `--ignore` Ignore file or folder. This file/folder is copied in target folder but not instrumented. Path relative to the source folder.
* `-x` or `--exclude` Exclude file or folder. This file/folder won't be copied in target folder. Path relative to the source folder.

By default function coverage is disabled, to enable it you can run

    node instrument.js --function /var/www/myApp /var/www/myInstrumentedApp

or

    node instrument.js --no-condition /var/www/myApp /var/www/myInstrumentedApp

to disable condition coverage.

The code generated offline is equal to the one generated by the server when session storage is disabled with `--no-session`.

You can also instrument a single file launching

    node instrument.js myScript.js

The output is sent to standard input.

The command

    node instrument /var/www/myApp /var/www/myInstrumentedApp -x .git -i lib/minified

copies and instrument all files inside `myApp` excluding `.git` which is not copied at all and `lib/minified` which is copied but won't be instrumented for coverage.