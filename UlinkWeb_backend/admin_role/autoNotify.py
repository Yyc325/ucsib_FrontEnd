import logging
import threading
import time
from django.db import OperationalError, ProgrammingError
from admin_role import service

logger = logging.getLogger(__name__)


def check_publish_notices():
    """定期检查并发布到期的通知"""
    while True:
        try:
            published_count = service.publish_due_notices()
            if published_count:
                logger.info('Auto-published %s due notice(s)', published_count)
        except (ProgrammingError, OperationalError) as exc:
            logger.warning("Auto publish skipped: %s", exc)

        # 每 30 秒检查一次
        time.sleep(30)


def start_publish_thread():
    """启动后台线程"""
    publish_thread = threading.Thread(target=check_publish_notices)
    publish_thread.daemon = True  # 设置为守护线程，主进程退出时自动终止。
    publish_thread.start() #启动线程
