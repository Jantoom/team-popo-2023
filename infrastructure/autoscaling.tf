resource "aws_appautoscaling_target" "monolithic" { 
    max_capacity       = 10 
    min_capacity       = 1 
    resource_id        = "service/popo/monolithic" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs" 

    depends_on = [aws_ecs_service.monolithic]
} 

resource "aws_appautoscaling_target" "admin" { 
    max_capacity       = 10 
    min_capacity       = 0 
    resource_id        = "service/popo/admin" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs" 

    depends_on = [aws_ecs_service.admin]
} 

resource "aws_appautoscaling_target" "auth" { 
    max_capacity       = 10 
    min_capacity       = 0 
    resource_id        = "service/popo/auth" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs" 

    depends_on = [aws_ecs_service.auth]
} 

resource "aws_appautoscaling_target" "violations" { 
    max_capacity       = 10 
    min_capacity       = 0 
    resource_id        = "service/popo/violations" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs" 

    depends_on = [aws_ecs_service.violations]
} 

resource "aws_appautoscaling_target" "model" { 
    max_capacity       = 10 
    min_capacity       = 1 
    resource_id        = "service/popo/model" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs"
    depends_on = [aws_ecs_service.model]
} 

resource "aws_appautoscaling_policy" "monolithic_cpu" { 
    name               = "monolithic_cpu" 
    policy_type        = "TargetTrackingScaling" 
    resource_id        = aws_appautoscaling_target.monolithic.resource_id 
    scalable_dimension = aws_appautoscaling_target.monolithic.scalable_dimension 
    service_namespace  = aws_appautoscaling_target.monolithic.service_namespace 
    
    target_tracking_scaling_policy_configuration { 
        predefined_metric_specification { 
            predefined_metric_type = "ECSServiceAverageCPUUtilization" 
        } 

        target_value = 10 
    } 
}

resource "aws_appautoscaling_policy" "admin_cpu" { 
    name               = "admin_cpu" 
    policy_type        = "TargetTrackingScaling" 
    resource_id        = aws_appautoscaling_target.admin.resource_id 
    scalable_dimension = aws_appautoscaling_target.admin.scalable_dimension 
    service_namespace  = aws_appautoscaling_target.admin.service_namespace 
    
    target_tracking_scaling_policy_configuration { 
        predefined_metric_specification { 
            predefined_metric_type = "ECSServiceAverageCPUUtilization" 
        } 

        target_value = 10 
    } 
}

resource "aws_appautoscaling_policy" "auth_cpu" { 
    name               = "auth_cpu" 
    policy_type        = "TargetTrackingScaling" 
    resource_id        = aws_appautoscaling_target.auth.resource_id 
    scalable_dimension = aws_appautoscaling_target.auth.scalable_dimension 
    service_namespace  = aws_appautoscaling_target.auth.service_namespace 
    
    target_tracking_scaling_policy_configuration { 
        predefined_metric_specification { 
            predefined_metric_type = "ECSServiceAverageCPUUtilization" 
        } 

        target_value = 10 
    } 
}

resource "aws_appautoscaling_policy" "violations_cpu" { 
    name               = "violations_cpu" 
    policy_type        = "TargetTrackingScaling" 
    resource_id        = aws_appautoscaling_target.violations.resource_id 
    scalable_dimension = aws_appautoscaling_target.violations.scalable_dimension 
    service_namespace  = aws_appautoscaling_target.violations.service_namespace 
    
    target_tracking_scaling_policy_configuration { 
        predefined_metric_specification { 
            predefined_metric_type = "ECSServiceAverageCPUUtilization" 
        } 

        target_value = 10 
    } 
} 

resource "aws_appautoscaling_policy" "sqs_messages_up_policy" { 
    name               = "sqs_messages" 
    policy_type        = "StepScaling" 
    resource_id        = aws_appautoscaling_target.model.resource_id 
    scalable_dimension = aws_appautoscaling_target.model.scalable_dimension 
    service_namespace  = aws_appautoscaling_target.model.service_namespace 
    
    step_scaling_policy_configuration {
        adjustment_type         = "ChangeInCapacity"
        cooldown                = 60
        metric_aggregation_type = "Average"

        step_adjustment {
            scaling_adjustment = 1
            metric_interval_lower_bound = 0
            metric_interval_upper_bound = 3
        }
        step_adjustment {
            scaling_adjustment = 2
            metric_interval_lower_bound = 3
            metric_interval_upper_bound = 8
        }
        step_adjustment {
            scaling_adjustment          = 3
            metric_interval_lower_bound = 8
        }
    }
}

resource "aws_appautoscaling_policy" "sqs_messages_down_policy" {
    name               = "sqs_messages_down_policy"
    policy_type        = "StepScaling"
    resource_id        = aws_appautoscaling_target.model.resource_id
    scalable_dimension = aws_appautoscaling_target.model.scalable_dimension
    service_namespace  = aws_appautoscaling_target.model.service_namespace

    step_scaling_policy_configuration {
        adjustment_type         = "ChangeInCapacity"
        cooldown                = 60
        metric_aggregation_type = "Average"

        step_adjustment {
            scaling_adjustment          = -1
            metric_interval_upper_bound = 0
        }
    }
}

resource "aws_cloudwatch_metric_alarm" "sqs_messages_alarm_up" {
    alarm_name          = "sqs_messages_alarm_up"
    comparison_operator = "GreaterThanOrEqualToThreshold"
    evaluation_periods  = 1
    metric_name         = "ApproximateNumberOfMessagesVisible"
    namespace           = "AWS/SQS"
    period              = 10
    statistic           = "Sum"
    threshold           = 2
    alarm_description   = "Alarm when queue length is greater than or equal to 10"
    alarm_actions       = [aws_appautoscaling_policy.sqs_messages_up_policy.arn]

    dimensions = {
        QueueName = aws_sqs_queue.model_queue.name
    }
}

resource "aws_cloudwatch_metric_alarm" "sqs_messages_alarm_down" {
    alarm_name          = "sqs_messages_alarm_down"
    comparison_operator = "LessThanOrEqualToThreshold"
    evaluation_periods  = 1
    metric_name         = "ApproximateNumberOfMessagesVisible"
    namespace           = "AWS/SQS"
    period              = 10
    statistic           = "Sum"
    threshold           = 1
    alarm_description   = "Alarm when queue length is less than or equal to 10"
    alarm_actions       = [aws_appautoscaling_policy.sqs_messages_down_policy.arn]

    dimensions = {
        QueueName = aws_sqs_queue.model_queue.name
    }
}