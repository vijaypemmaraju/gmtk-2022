namespace Collision {
  export const COLLISION_CATEGORIES = {
    Player: 1,
    Enemy: 2,
    PlayerProjectile: 4,
    EnemyProjectile: 8,
    Map: 16,
  };

  /**
   * COLLISION MASK
   * |                  | Map | EnemyProjectile | PlayerProjectile | Enemy | Player |
   * |-----------------:|:---:|:---------------:|:----------------:|:-----:|:------:|
   * |              Map |  0  |        1        |         1        |   1   |    1   |
   * |  EnemyProjectile |  1  |        0        |         0        |   0   |    1   |
   * | PlayerProjectile |  1  |        0        |         0        |   1   |    0   |
   * |            Enemy |  1  |        0        |         1        |   0   |    1   |
   * |           Player |  1  |        1        |         0        |   1   |    0   |
   */

  export const COLLISION_MASKS = {
    Player: 0x1a, // 11010
    Enemy: 0x15, // 10101
    PlayerProjectile: 0x12, // 10010
    EnemyProjectile: 0x11, // 10001
    Map: 0xf, // 01111
  };
}

export default Collision;
