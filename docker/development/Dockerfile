FROM ruby:3.0-alpine3.13

ENV APP_PATH /project
ENV APP_BIN_PATH "$APP_PATH/bin"
ENV PATH "$PATH:$APP_BIN_PATH"

WORKDIR $APP_PATH

COPY ./bin/install-system-dependencies $APP_BIN_PATH/install-system-dependencies
RUN install-system-dependencies

# RUBY ENVS
ENV BUNDLE_PATH "${APP_PATH}/vendor/bundle"
ENV BUNDLE_BIN "${BUNDLE_PATH}/ruby/3.0.0/bin"
ENV PATH "${PATH}:${BUNDLE_BIN}"
ENV BUNDLE_JOBS 4

USER user

ENTRYPOINT [ "docker/development/entrypoint" ]