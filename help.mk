## `help` target will show description of each target
## Target description should be immediate line before target starting with `##`

# COLORS
red := $(shell tput -Txterm setaf 1)
green := $(shell tput -Txterm setaf 2)
yellow := $(shell tput -Txterm setaf 3)
white := $(shell tput -Txterm setaf 7)
reset := $(shell tput -Txterm sgr0)

# CONSTANTS
target_max_length = 30

.PHONY: default
default: help

.PHONY: help
## Show help
help:
	@echo ""
	@echo "Usage:"
	@echo "  $(yellow)make$(reset) $(green)<target>$(reset)"
	@echo ""
	@echo "Targets:"
	@awk '/^[a-zA-Z\-_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			split($$1, arr, ":"); \
			helpCommand = arr[1]; \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  $(yellow)%-$(target_max_length)s$(reset) $(green)%s$(green)\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)
