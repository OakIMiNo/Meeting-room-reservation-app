import pytest
# from ディレクトリ名.ファイル名 import 関数名
from api.sample import app_function

# assert行でexpectする値を記載 
def test_func():
    assert app_function() == 1

# backendコンテナ内の :/src# で poetry run pytest

