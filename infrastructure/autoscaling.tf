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
    min_capacity       = 1 
    resource_id        = "service/popo/admin" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs" 

    depends_on = [aws_ecs_service.admin]
} 

resource "aws_appautoscaling_target" "auth" { 
    max_capacity       = 10 
    min_capacity       = 1 
    resource_id        = "service/popo/auth" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs" 

    depends_on = [aws_ecs_service.auth]
} 

resource "aws_appautoscaling_target" "violations" { 
    max_capacity       = 10 
    min_capacity       = 1 
    resource_id        = "service/popo/violations" 
    scalable_dimension = "ecs:service:DesiredCount" 
    service_namespace  = "ecs" 

    depends_on = [aws_ecs_service.violations]
} 

resource "aws_appautoscaling_policy" "monolithic-cpu" { 
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

resource "aws_appautoscaling_policy" "admin-cpu" { 
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

resource "aws_appautoscaling_policy" "auth-cpu" { 
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

resource "aws_appautoscaling_policy" "violations-cpu" { 
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
