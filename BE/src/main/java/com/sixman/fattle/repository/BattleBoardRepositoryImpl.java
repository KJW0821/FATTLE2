package com.sixman.fattle.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sixman.fattle.dto.dto.BoardDto;
import com.sixman.fattle.entity.QFoodBoard;
import com.sixman.fattle.entity.QUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BattleBoardRepositoryImpl implements BattleBoardRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QFoodBoard qboard = QFoodBoard.foodBoard;
    private final QUser quser = QUser.user;

    @Override
    public List<BoardDto> getBoardList(String battleCode) {
        return queryFactory
                .select(
                        Projections.constructor(
                                BoardDto.class,
                                qboard.battleCd,
                                qboard.playerCd,
                                quser.nickname,
                                qboard.recDt,
                                qboard.imgPath))
                .from(qboard)
                .join(quser)
                .on(qboard.playerCd.eq(quser.userCd))
                .where(qboard.battleCd.eq(battleCode))
                .fetch();
    }

}
