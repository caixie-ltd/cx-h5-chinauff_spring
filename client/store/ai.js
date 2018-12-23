/**
 * @file ai  图片验证数据状态 / ES module
 * @module store/ai
 */

export const state = () => {
  return {
    posting: false,
    data: {
      score: -1
    }
  }
}

export const mutations = {
  POST_IMAGE(state) {
    state.posting = true
  },
  POST_IMAGE_SUCCESS(state, action) {
    state.posting = false
    state.data = action
  },
  POST_IMAGE_FAILURE(state) {
    state.posting = false
  },

  RESET_SCORE (state) {
    state.data.score = -1
  }
}
