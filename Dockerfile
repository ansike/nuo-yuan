# TODO, vestack1.8 版本将Dockerfile.multiarch和 Dockerfile.platform 合并成一个, 为了兼容 1.5 版本打包, 暂不合并
# 安全同学维护镜像源文档 https://bytedance.feishu.cn/docx/PZivdcuA0oPlMGxtPeEc32Ozn3f
# 基础镜像详情 https://cloud.bytedance.net/image/362169
FROM hub.byted.org/c_platform/platform_node:security.debian11.nodejs16.dnsutils.migration as builder

WORKDIR /usr/src/app

COPY ./ ./

# 项目id seed平台构建时传的参数
ARG project_id=6492c05ba7e181003f648f8f
# 默认不需要携带静态资源
ARG with_static

RUN set -x \
  && chmod +x ./shell/scm_build_private_platform_node.sh \
  && CUSTOM_SEED_ID=${project_id} CUSTOM_STATIC=${with_static} bash ./shell/scm_build_private_platform_node.sh \
  && echo 'docker shell build completed' \
  && rm -rf

FROM hub.byted.org/c_platform/platform_node:security.debian11.nodejs16.dnsutils.migration

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/output ./output

ENV NODE_ENV=production \
  PORT=3001

EXPOSE 3001

# same with bootstrap.sh
CMD cd output/packages/platform-node && yarn start:prod
