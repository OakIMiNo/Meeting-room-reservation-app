from sqlalchemy.ext.asyncio import AsyncSession

import api.models.reservations as reservation_model
import api.schemas.reservations as reservation_schema


async def create_reservation(
    db: AsyncSession, reservation_create: reservation_schema.ReservationCreate
) -> reservation_model.Reservation:
    reservation = reservation_model.Reservation(**reservation_create.dict())
    db.add(reservation)
    await db.commit()
    await db.refresh(reservation)
    return reservation

# 引数としてスキーマ reserve_create: reserve_schema.ReserveCreate を受け取る。
# これをDBモデルである reservation_model.Reservation に変換する
# commit: DBにコミットする
# refresh: DB上のデータを元にReservationインスタンス reservation を更新する（この場合、作成したレコードの id を取得する）
# return: 作成したDBモデルを返却する