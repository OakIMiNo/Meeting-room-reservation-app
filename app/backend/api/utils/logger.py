import logging

def setup_logger(name):
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    # ファイルに出力するログレベルをdebugに設定。挙動みて変更可
    fh = logging.FileHandler('./api/utils/test.log')
    fh.setLevel(logging.DEBUG)
    fh_formatter = logging.Formatter('%(levelname)s %(asctime)s [%(name)s] %(message)s')
    fh.setFormatter(fh_formatter)
    
    # コンソールに出力するログレベルをinfoに設定 挙動みて変更可
    ch = logging.StreamHandler()
    ch.setLevel(logging.INFO)
    ch_formatter = logging.Formatter(
        '%(asctime)s - %(levelname)s - %(message)s', '%Y-%m-%d %H:%M:%S'
        )
    ch.setFormatter(ch_formatter)

    logger.addHandler(fh)
    logger.addHandler(ch)
    return logger






    logger.addHandler(fh)
    return logger

