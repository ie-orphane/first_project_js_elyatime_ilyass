import string

# abcdefghijklmnopqrstuvwxyz
# 0123456789
# !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~♂♀
# [' \t\n\r\x0b\x0c']

from datetime import datetime
print(f"{datetime.utcnow():%Y-%m-%d %H:%M}")