(.venv) PS C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551> python app.py
Đã khởi tạo Cơ sở dữ liệu SQLite thành công!
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
 * Restarting with stat
Đã khởi tạo Cơ sở dữ liệu SQLite thành công!
 * Debugger is active!
 * Debugger PIN: 137-196-006
127.0.0.1 - - [05/Nov/2026 14:46:14] "GET /appointments HTTP/1.1" 404 -
127.0.0.1 - - [05/Nov/2026 14:48:12] "PUT /api/appointments/1/assign HTTP/1.1" 500 -
 * Detected change in 'C:\\Users\\PC\\Music\\CDTN1_HHaDaiVi_2374802010551\\src\\controllers\\appointment_controller.py', reloading
 * Restarting with stat
Đã khởi tạo Cơ sở dữ liệu SQLite thành công!
 * Debugger is active!
 * Debugger PIN: 137-196-006
Traceback (most recent call last):
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 623, in get_json
    rv = self.json_module.loads(data)
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\flask\json\provider.py", line 187, in loads
    return json.loads(s, **kwargs)
           ~~~~~~~~~~^^^^^^^^^^^^^
  File "C:\Python314\Lib\json\__init__.py", line 352, in loads
    return _default_decoder.decode(s)
           ~~~~~~~~~~~~~~~~~~~~~~~^^^
  File "C:\Python314\Lib\json\decoder.py", line 345, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
               ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Python314\Lib\json\decoder.py", line 361, in raw_decode
    obj, end = self.scan_once(s, idx)
               ~~~~~~~~~~~~~~^^^^^^^^
json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\src\controllers\appointment_controller.py", line 14, in assign_appointment
    data = request.get_json() or {}
           ~~~~~~~~~~~~~~~~^^
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 632, in get_json
    rv = self.on_json_loading_failed(e)
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\flask\wrappers.py", line 214, in on_json_loading_failed
    return super().on_json_loading_failed(e)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 657, in on_json_loading_failed
    raise BadRequest(f"Failed to decode JSON object: {e}")
werkzeug.exceptions.BadRequest: 400 Bad Request: Failed to decode JSON object: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)
127.0.0.1 - - [05/Nov/2026 14:50:46] "PUT /api/appointments/1/assign HTTP/1.1" 500 -
 * Detected change in 'C:\\Users\\PC\\Music\\CDTN1_HHaDaiVi_2374802010551\\src\\services\\appointment_service.py', reloading
 * Restarting with stat
Đã khởi tạo Cơ sở dữ liệu SQLite thành công!
 * Debugger is active!
 * Debugger PIN: 137-196-006
Traceback (most recent call last):
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 623, in get_json
    rv = self.json_module.loads(data)
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\flask\json\provider.py", line 187, in loads
    return json.loads(s, **kwargs)
           ~~~~~~~~~~^^^^^^^^^^^^^
  File "C:\Python314\Lib\json\__init__.py", line 352, in loads
    return _default_decoder.decode(s)
           ~~~~~~~~~~~~~~~~~~~~~~~^^^
  File "C:\Python314\Lib\json\decoder.py", line 345, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
               ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Python314\Lib\json\decoder.py", line 361, in raw_decode
    obj, end = self.scan_once(s, idx)
               ~~~~~~~~~~~~~~^^^^^^^^
json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\src\controllers\appointment_controller.py", line 14, in assign_appointment
    data = request.get_json() or {}
           ~~~~~~~~~~~~~~~~^^
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 632, in get_json
    rv = self.on_json_loading_failed(e)
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\flask\wrappers.py", line 214, in on_json_loading_failed
    return super().on_json_loading_failed(e)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 657, in on_json_loading_failed
    raise BadRequest(f"Failed to decode JSON object: {e}")
werkzeug.exceptions.BadRequest: 400 Bad Request: Failed to decode JSON object: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)
127.0.0.1 - - [05/Nov/2026 14:54:18] "PUT /api/appointments/1/assign HTTP/1.1" 500 -
Traceback (most recent call last):
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 623, in get_json
    rv = self.json_module.loads(data)
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\flask\json\provider.py", line 187, in loads
    return json.loads(s, **kwargs)
           ~~~~~~~~~~^^^^^^^^^^^^^
  File "C:\Python314\Lib\json\__init__.py", line 352, in loads
    return _default_decoder.decode(s)
           ~~~~~~~~~~~~~~~~~~~~~~~^^^
  File "C:\Python314\Lib\json\decoder.py", line 345, in decode
    obj, end = self.raw_decode(s, idx=_w(s, 0).end())
               ~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Python314\Lib\json\decoder.py", line 361, in raw_decode
    obj, end = self.scan_once(s, idx)
               ~~~~~~~~~~~~~~^^^^^^^^
json.decoder.JSONDecodeError: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\src\controllers\appointment_controller.py", line 14, in assign_appointment
    data = request.get_json() or {}
           ~~~~~~~~~~~~~~~~^^
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 632, in get_json
    rv = self.on_json_loading_failed(e)
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\flask\wrappers.py", line 214, in on_json_loading_failed
    return super().on_json_loading_failed(e)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^
  File "C:\Users\PC\Music\CDTN1_HHaDaiVi_2374802010551\.venv\Lib\site-packages\werkzeug\wrappers\request.py", line 657, in on_json_loading_failed
    raise BadRequest(f"Failed to decode JSON object: {e}")
werkzeug.exceptions.BadRequest: 400 Bad Request: Failed to decode JSON object: Expecting property name enclosed in double quotes: line 1 column 2 (char 1)
127.0.0.1 - - [05/Nov/2026 14:54:34] "PUT /api/appointments/9999/assign HTTP/1.1" 500 -
127.0.0.1 - - [05/Nov/2026 14:55:18] "PUT /api/appointments/1/assign HTTP/1.1" 404 -
 * Detected change in 'C:\\Users\\PC\\Music\\CDTN1_HHaDaiVi_2374802010551\\tests\\test_appointment.py', reloading
 * Restarting with stat
Đã khởi tạo Cơ sở dữ liệu SQLite thành công!
 * Debugger is active!
 * Debugger PIN: 137-196-006
 * Detected change in 'C:\\Users\\PC\\Music\\CDTN1_HHaDaiVi_2374802010551\\tests\\test_appointment.py', reloading
 * Restarting with stat
Đã khởi tạo Cơ sở dữ liệu SQLite thành công!
 * Debugger is active!
 * Debugger PIN: 137-196-006
