################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CPP_SRCS += \
../arduino/lib/gy521.cpp 

OBJS += \
./arduino/lib/gy521.o 

CPP_DEPS += \
./arduino/lib/gy521.d 


# Each subdirectory must supply rules for building sources it contributes
arduino/lib/%.o: ../arduino/lib/%.cpp
	@echo 'Building file: $<'
	@echo 'Invoking: Cross G++ Compiler'
	g++ -O0 -g3 -Wall -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$(@:%.o=%.d)" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


