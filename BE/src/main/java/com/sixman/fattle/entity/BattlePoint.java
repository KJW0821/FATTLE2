package com.sixman.fattle.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
@Builder
@Table(name = "battle_point_tb")
public class BattlePoint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "point_cd")
    private int pointCd;

    @Column(name = "battle_cd")
    private String battleCd;

    @Column(name = "player_cd")
    private long playerCd;

    @Column(name = "trigger_cd")
    private long triggerCd;

    @Column(name = "type")
    private int type;

    @Column(name = "point")
    private int point;

    @Column(name = "rec_dt")
    private Timestamp recDt;

}
